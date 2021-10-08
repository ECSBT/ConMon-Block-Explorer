FROM golang:1.15-alpine
WORKDIR /app/

RUN apk add build-base

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go get -d -v ./...

RUN go build -o agent cmd/agent/agent.go

ENTRYPOINT ["./agent"]
