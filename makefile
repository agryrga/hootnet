build:
	docker compose build

up:
	docker compose up -d

stop:
	docker compose stop

down:
	docker compose down

restart:
	docker compose down
	docker compose up -d

logs:
	docker compose logs -f app

migrate:
	docker compose run --rm migrate npx prisma migrate dev --name init

