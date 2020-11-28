# pantalaimon-prepare
Prepares an account to be used with Pantalaimon (password rotation, access token fetching, etc)

## Running

1. Prepare a version of `default.json` to be mounted into a container.
2. `docker run --rm -it -v /path/to/edited/default.json:/app/config.json t2bot/pantalaimon-prepare`
