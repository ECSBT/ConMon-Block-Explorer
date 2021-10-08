package config

import (
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

// Config is a config.yml representation
type Config struct {
	Host         string
	AuthToken    string
	DatabaseName string

	// EthRpcUrl represents ethereum transactions server url.
	EthRpcUrl string
	EthMetricsUrl string
	AppName   string
}

func init() {
	viper.SetEnvPrefix("agent")
	viper.SetDefault("env", "development")
}

// Load loads config.yml into a Config struct
func Load() *Config {
	viper.AddConfigPath("../../")
	viper.SetConfigFile("config.yml")
	viper.SetConfigType("yaml")

	if err := viper.ReadInConfig(); err != nil {
		panic(errors.Wrapf(err, "failed to find config.yml file"))
	}

	viper.AutomaticEnv()

	if "development" == viper.GetString("env") {
		log.SetLevel(log.DebugLevel)
	}

	return &Config{
		Host:          viper.GetString("influxdb.host"),
		AuthToken:     viper.GetString("influxdb.auth_token"),
		DatabaseName:  viper.GetString("influxdb.database"),
		EthRpcUrl:     viper.GetString("ethereum.rpc_url"),
		EthMetricsUrl: viper.GetString("ethereum.metrics_url"),
		AppName:       viper.GetString("client.app_name"),
	}
}
