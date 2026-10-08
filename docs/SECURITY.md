# Security Model

Static-first is the default. Requested paths must resolve to the expected directory/file type; symlink inputs are not treated as ordinary files; Phase 3 reads at most 256 KiB per file, 512 evidence files, 8 MiB total, and eight directory levels; output does not include stack traces; and issue Markdown is inert text. GitHub tokens come only from supported environment/credential mechanisms and are never printed. Network access is opt-in and adapter-owned. No package scripts, dependency installation, or target tests run automatically.
