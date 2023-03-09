# Translate-Inator

### Installation
Populate values from `.env.template` and rename it to `.env` and run these commands. If you are running on a local environment, change the value of `DOMAIN` to localhost. This will be used by the setup script to create a self-signed certificate on `/etc/letsencrypt`.
```
docker-compose -f ./docker-compose.setup.yaml up -d
docker-compose up -d
```

### Features
TODO