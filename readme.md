# GitHub Avatar Downloader

## Problem Statement

Given a GitHub repository name and owner, download all the contributors' profile images and save them to a subdirectory, `avatars/`. Directory will be created if not found. If an existing file of the same name exists, it will be overwritten.

## Expected Usage

This program should be executed from the command line, in the following manner:

`node download_avatars.js <repo: owner> <repo: name>`

For example, `node download_avatars.js nodejs node` will attempt to download the avatars of all contributors to the node repository, owned by user nodejs.

## Alternative Usage

This program will also accept some alternative inputs:

### Same name for Repo Owner and Repo Name

`node download_avatars.js <repo: owner/name>`

For example, `node download_avatars.js ruby` will attempt to download based on ruby repo, owned by user ruby.

### Too many inputs

If more than 2 input parameters are provided, any extras will be ignored.

For example, `node download_avatars.js ruby ruby ruby` will download based on ruby repo, owned by user ruby.
