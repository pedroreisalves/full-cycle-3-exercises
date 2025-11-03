FROM golang:1.25.3-alpine3.22 AS builder

WORKDIR /usr/src/app

COPY go.mod hello.go ./

RUN go build -ldflags="-s -w" -o hello

FROM scratch

COPY --from=builder /usr/src/app/hello /hello

ENTRYPOINT ["/hello"]