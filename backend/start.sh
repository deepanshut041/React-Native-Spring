#!/bin/bash
gradle getDeps --no-daemon
gradle --stop
gradle build --continuous --quiet &
gradle bootRun --no-daemon