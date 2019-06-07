# Get the emsdk repo
git clone https://github.com/emscripten-core/emsdk.git

# Enter that directory
cd emsdk

# Fetch the latest version of the emsdk
# Use 1.38.34 (https://github.com/emscripten-core/emsdk/commit/188c3edb9b7edafeaef4f4658a19dbcd99e81a37)
git pull && git checkout 188c3edb9b7edafeaef4f4658a19dbcd99e81a37

# Download and install the latest SDK tools.
./emsdk install 1.38.34  # ./emsdk install latest

# Make the "latest" SDK "active" for the current user. (writes ~/.emscripten file)
./emsdk activate 1.38.34 # ./emsdk install latest

# Activate PATH and other environment variables in the current terminal
source ./emsdk_env.sh
