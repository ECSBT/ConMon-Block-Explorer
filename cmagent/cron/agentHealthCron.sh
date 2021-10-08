#!/bin/bash

crontab agent-health-crontab && \

service crond restart
