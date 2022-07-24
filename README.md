# kitapbar.com

## Development

1. start mongodb server
```bash
docker-compose -f docker-compose.dev.yaml up -d
```

2. yandex service
```bash
cd services/yandex
```
* create a .env file by copying and adjusting .env.example
```bash
cp .env.example .env
```
* download packages and start yandex service
```bash
yarn
yarn dev
```

3. client
```bash
cd services/client
```
* create a .env.development file by copying and adjusting .env.example
```bash
cp .env.example .env.development
```
* download packages and start client
```bash
yarn
yarn dev
```

### web pages/links where you can find yandex disk links
* https://eksisozluk.com/somurulesi-e-kitap-siteleri--1687482?a=nice

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
