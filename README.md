# Translate-Inator
![logo](/home.png)
## Installation
Populate values from `.env.template` and rename it to `.env` and run these commands. If you are running on a local environment, change the value of `DOMAIN` to localhost. This will be used by the setup script to create a self-signed certificate on `/etc/letsencrypt`.
```bash
docker-compose -f ./docker-compose.setup.yaml up -d
docker-compose up -d
```

## Features
- Translation using GCP Cloud translation API
- User authentication
- CI/CD with Github actions
- Automatic SSL renewal

For a more comprehensive list, refer to the [changelog](CHANGELOG.md)

## Deployment Guide

### Repository and CI/CD pipeline
If you would like to deploy on your own GCE instance or fork this repository, there are several steps that you need to do.

Firstly, there are several secrets that is required to deploy services. These secrets should be put in Github's environments.

- Variables required for the development pipeline:
```env
ENV_FILE=<your .env file in base64>
```

- Variables required for the production pipeline
```env
ENV_FILE=<your .env file in base64>
GCP_SERVICE_ACCOUNT_JSON=<GCP service account with access to your GCE instance>
PROJECT_ID=<your cloud project id>
```

Deployment branches should also be limited to specific branches so that these secrets are not accessible by anything other than the production environment.

WIP: Several values in the workflow should be changed as it is currently still hardcoded.

### GCP
These are the list of GCP API's that are required for this project
- [Container Registry](https://cloud.google.com/container-registry)
- [Cloud Translation](https://cloud.google.com/translate)
- [Compute Engine](https://cloud.google.com/compute)

### Deployment:
To set up the deployment environment, make sure the machine has [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/)installed.

Generating SSL credentials, this will only need to be run once: 
```
cd ./VideoTranslatorAI
docker-compose -f ./docker-compose.setup.yaml up -d
```
`docker-compose` will automatically detect `.env` file in the same working directory. Nginx will also require files from `nginx/setup`. If the CI/CD pipelines haven't been setup yet, you will need to manually populate and copy the files to the remote machine.

Running the services:
```
docker-compose -f ./docker-compose.prod.yaml up -d
```
This command will pull images from your configured container registry.