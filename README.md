# React smart img

https://github.com/user-attachments/assets/7348cdf1-88e8-4a57-9de7-a1e198dfa762

### Demonstrates:

- ReactDOM `preload` function to insert preload link tags into document head - https://react.dev/reference/react-dom/preload
- Browser native image lazy loading capability - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#lazy

### Gotcha

At time of writing, a bug in Firefox prevents lazy loading unless the `loading` attribute is set **_before_** the `src` attribute!

### Setup

```bash
pnpm install

pnpm dev
```

### Live example

https://stellular-taiyaki-fc3266.netlify.app/
