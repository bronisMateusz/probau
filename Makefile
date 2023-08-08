ssh:
	docker compose exec -it mystrapi bash

make dev:
	docker compose up -d
	docker compose exec -it mystrapi bash

make prod:
	docker build -f Dockerfile.prod .
	docker compose up -d
