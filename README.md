# Logger Facade POC for Node

An experiment with Logger Facade, formatters, and possibly other patterns
using Node JS, TypeScript and Winston

## Getting Started

```bash
npm install
npm start
```

## Implementation Notes

- App execution is simulated via `test.js`
- Active log level is set by changing the env var `LOG_LEVEL`
- Logging output can be fully customized by adding winston formatters
  - Refer to `src/error-formatters` for implementation example
  - Refer to `src/configure-logging` for configuration
