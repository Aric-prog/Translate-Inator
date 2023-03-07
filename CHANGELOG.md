# CHANGELOG.md

## 8-3-2023
Features: 
    - Added nginx to docker compose -> d9783a0
    - HTTPS and automatic renewal for nginx -> e34efc1
    - HTTPS for nginx running on local -> 755af72
    - Frontend service now serves their own files instead of needing nginx -> 9705ca3
    - Docker compose start up only uses a single env file for all services -> a4fc35b

Fix: 
    - Fixed backend import error due to no package.json file -> 2ffb081
    - Fixed nginx being unable to find SSL files -> bd3cd74
