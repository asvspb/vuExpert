/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      comment: 'This dependency is part of a circular relationship.',
      from: {},
      to: { circular: true }
    },
    {
      name: 'not-to-unresolvable',
      severity: 'error',
      comment: 'This module depends on a module that cannot be found.',
      from: {},
      to: { couldNotResolve: true }
    },
    {
      name: 'no-orphans',
      severity: 'warn',
      comment: 'This is an orphan module - it is not required by any other module.',
      from: { orphan: true, pathNot: '\\.d\\.ts$' },
      to: {}
    },
    {
      name: 'no-utils-to-components',
      severity: 'error',
      comment: 'Utility and service layers should not depend on UI components.',
      from: { path: '^src/(utils|composables|services)' },
      to: { path: '^src/components' }
    }
  ],
  options: {
    doNotFollow: {
      path: 'node_modules'
    },
    includeOnly: '^src',
    reporterOptions: {
      dot: {
        theme: {
          graph: { rankdir: "TD", splines: "ortho" }
        }
      }
    }
  }
};
