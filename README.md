# kitapbar.com

## Development

* start mongodb server

```bash
docker-compose -f docker-compose.dev.yaml up -d
cd services/yandex && yarn dev
cd services/client && yarn dev
```

## Contributing

Please feel free to contribute. For new features, first open an issue to discuss what you want.

## Screenshots

<div style='display: flex; flex-direction: column; gap: 10px; align-items: center; justify-content: center'>
  <img src='screenshots/home-search.png' alt='kitapbar-home-search' style='width: 80%'>
  <img src='screenshots/share.png' alt='kitapbar-share' style='width: 80%'>
  <img src='screenshots/progress.png' alt='kitapbar-progress' style='width: 40%'>
</div>

## License

MIT
