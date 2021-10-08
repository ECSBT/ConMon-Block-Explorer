# Alerts

## Setup 
1. install dependencies 
```bash
$ go get
```

### 2. Config 
Use `config.yml` file to set up variables. 

### 3. Build
```bash
go build cmd/alert/alert.go
```
this will generate an executable alert bin. 

If you need to target a specific platform use: 

```bash
$ GOOS=linux go build cmd/alert/alert.go
```

### 4. Run it
if you need to run it with different variables, we can use `METRICS_` as prefix, i.e.
```bash
$ ETHEREUM_RPC_URL=http://localhost:8549 ENV=production ./agent
```
      
or set it up as Env variables:

```bash
$ export INFLUXDB_HOST=http://localhost:8086
$ export INFLUXDB_AUTH_TOKEN=user:pwd4user
$ export INFLUXDB_DATABASE=influxdb_test
$ export ETHEREUM_RPC_URL=http://localhost:8549
$ export ENV=production

./agent
```