#!/bin/bash
# This script is used to run the server
# Arguments:
# -e local/qe/dev/prod runs the server with relevant environment variables
# -p runs server as a background service.

# Parsing arguments

PRODUCTION="false"

POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    -e|--environment)
    ENVIRONMENT="$2"
    shift # past argument
    shift # past value
    ;;
    -p|--prod)
    PRODUCTION="true"
    shift # past value
    ;;
    *)    # unknown option
    POSITIONAL+=("$1") # save it in an array for later
    shift # past argument
    ;;
esac
done
set -- "${POSITIONAL[@]}" # restore positional parameter

# end parsing arguments

# changing the working directory to the location of this file
dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "${dir}"
cd ..

# Install all dependencies
npm install

# getting the environment variables
source ./config/${ENVIRONMENT}.env

# kills all the processes using this port

# Running the node.js server
if [ "$PRODUCTION" == "true" ] ; then
    kill $(lsof -t -i:${PORT})
    nohup npm start &
else
    npm start
fi
