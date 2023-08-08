FROM golang:latest

WORKDIR /app

COPY . /app

RUN chmod +x /app

RUN go build -o api .

EXPOSE 8080

CMD ["./api"]