#!/bin/bash

for i in {1..40}
do
  git commit --allow-empty -m "chore: auto commit $i"
  echo "Created commit $i"
  sleep 1
done

echo "🎉 40 commits created successfully!"
