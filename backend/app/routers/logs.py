from fastapi import APIRouter, Request
import logging
from ..schemas import LogEvent
from ..limiter import limiter

router = APIRouter()
logger = logging.getLogger("backend_logger")

@router.post("/logs")
@limiter.limit("60/minute")
async def collect_logs(request: Request, event: LogEvent):
    client_ip = request.client.host if request.client else "unknown"
    safe_msg = event.message.replace("\n", " ").replace("\r", "")
    safe_url = (event.url or "").replace("\n", " ")
    
    log_msg = f"ClientIP: {client_ip} | URL: {safe_url} | {safe_msg} | Context: {event.context}"
    
    if event.level == "error":
        logger.error(log_msg)
    elif event.level == "warn":
        logger.warning(log_msg)
    elif event.level == "debug":
        logger.debug(log_msg)
    else:
        logger.info(log_msg)
        
    return {"status": "logged"}
