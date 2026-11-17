#!/bin/bash
APP_NAME="QMS_Telemetry"
VERSION="1.0.0"
BUILD_DIR="./build"
DIST_DIR="./dist"

echo "=== Starting QMS iDrive 8 Package Assembly ==="
rm -rf "$BUILD_DIR" "$DIST_DIR"
mkdir -p "$BUILD_DIR/$APP_NAME" "$DIST_DIR"

cp -R ./src/* "$BUILD_DIR/$APP_NAME/"
cp ./manifest.json "$BUILD_DIR/$APP_NAME/"

find "$BUILD_DIR/$APP_NAME" -type f -exec shasum -a 256 {} \; > "$BUILD_DIR/$APP_NAME/checksums.txt"
tar -czf "$DIST_DIR/${APP_NAME}_v${VERSION}.tar.gz" -C "$BUILD_DIR" "$APP_NAME"

echo "=== Build Complete! Package ready at: $DIST_DIR/${APP_NAME}_v${VERSION}.tar.gz ==="
