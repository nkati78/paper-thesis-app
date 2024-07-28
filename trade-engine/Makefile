DOCKER_IMAGE=trade-engine

# create migration timestamp
# Usage: make migration-date
migration-date:
	@echo $(shell date +%Y%m%d%H%M%S)

# run docker container
# Usage: make run
run:
	docker-compose up

# build docker container
# Usage: make build
build:
	docker build -t $(DOCKER_IMAGE) .