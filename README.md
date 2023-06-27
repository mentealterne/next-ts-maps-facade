This is a simple showcase of a map-facade in typescript. The main goal is to consume the map methods inside the component independently of the map service it relies on.
In this way we can try to achieve a more "domain" oriented service, avoiding code intertwining, dependency problems and hard refactorings
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
## The map event emitter service
The map event emitter service is a simple service that allows to emit events from the map component to the map facade. This is useful to avoid the map component to know the map facade and to avoid the map facade to know the map component.

## The map provider
The map provider is a simple service that allows to inject the map facade in the map component. The facade takes care of map loading and returns only the methods required for the app use cases.


