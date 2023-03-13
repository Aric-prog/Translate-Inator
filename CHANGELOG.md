# CHANGELOG.md

## 13-3-2023
Features:
- Added auth page interface and login functions -> [9aaeaec](https://github.com/Aric-prog/VideoTranslatorAI/commit/9aaeaec)
- Added functionality to todo interface -> [5d4eea1](https://github.com/Aric-prog/VideoTranslatorAI/commit/5d4eea1)
- Added cloud translation API to backend -> [5cf8f41](https://github.com/Aric-prog/VideoTranslatorAI/commit/5cf8f41)
- Added Material UI and interface for inserting and translating notes -> [6123c63](https://github.com/Aric-prog/VideoTranslatorAI/commit/6123c63)
- Github actions now copy compose files and .env file to remote machine -> [de6c85b](https://github.com/Aric-prog/VideoTranslatorAI/commit/de6c85b)

Fix:
- Fixed error formatting on login page -> [cff13b7](https://github.com/Aric-prog/VideoTranslatorAI/commit/cff13b7)

Chore:
- Remove docker step in frontend build, moved to production build -> [c8d52b9](https://github.com/Aric-prog/VideoTranslatorAI/commit/c8d52b9)
- Deployment stage is now exclusive to production environment -> [c6a9d57](https://github.com/Aric-prog/VideoTranslatorAI/commit/c6a9d57)

## 8-3-2023
Features: 
- Added nginx to docker compose -> [d9783a0](https://github.com/Aric-prog/VideoTranslatorAI/commit/d9783a0)
- HTTPS and automatic renewal for nginx -> [e34efc1](https://github.com/Aric-prog/VideoTranslatorAI/commit/e34efc1)
- HTTPS for nginx running on local -> [755af72](https://github.com/Aric-prog/VideoTranslatorAI/commit/755af72)
- Frontend service now serves their own files instead of needing nginx -> [9705ca3](https://github.com/Aric-prog/VideoTranslatorAI/commit/9705ca3)
- Docker compose start up only uses a single env file for all services -> [a4fc35b](https://github.com/Aric-prog/VideoTranslatorAI/commit/a4fc35b)

Fix: 
- Fixed backend import error due to no package.json file -> [2ffb081](https://github.com/Aric-prog/VideoTranslatorAI/commit/2ffb081)
- Fixed nginx being unable to find SSL files -> [bd3cd74](https://github.com/Aric-prog/VideoTranslatorAI/commit/bd3cd74)
- CI/CD for production can be triggered from other branch -> [f8e1312](https://github.com/Aric-prog/VideoTranslatorAI/commit/f8e1312)