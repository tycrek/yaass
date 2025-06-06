<div align="center">

<h1><a href="https://github.com/tycrek/yaass" target="_blank"><img height="180" alt="yaass" src="https://images.tycrek.com/yaass-logo.png" /></a></h1>

*Yet Another A ShareX Server*

</div>

## How to use

yaass is simple: Install either [Bun](https://bun.sh/) or [Docker Compose](https://docs.docker.com/compose/).

```bash
# Download this project
git clone https://github.com/tycrek/yaass.git
cd yaass/

# If you chose Bun:
bun install
bun start

# Or you chose Docker:
docker compose up
```

For support, [visit the Discord](https://discord.gg/wGZYt5fasY).

## Using HTTPS

For HTTPS support, you must configure a reverse proxy. I recommend [Caddy] but any reverse proxy works fine (such as Apache or Nginx). A sample config for Caddy is provided below:

```
ass.example.com {
    reverse_proxy localhost:40115
}
```

[Caddy]: https://caddyserver.com/

### Configure ShareX

Add a new **Custom uploader** and configure it as shown:

| Option | Value |
| --- | --- |
| Method | POST |
| Request URL | `https://<your.domain>/upload` |
| Body | Form data (multipart/form-data) |
| File form name | file |
| URL | `{json:.url}` |

*This is subject to change as project development continues.*

#### Optional headers

| Header | Usage |
| --- | --- |
| `x-yaass-sid-method` | can be `default` or `gfycat`. previously known as "access mode" in ass |

## What next?

More features are coming soon.

- Multi-user support
- Dashboards for both users & admins
- *as well as most features previously in [ass](https://github.com/tycrek/ass)*

## Contributing

Contributions are welcome! Submit any changes via PR, but please detail what you've added. Please try to match the code style of the project when submitting changes.
