# BMAD install notes — 2026-03-17

## Outcome

A fresh BMAD install was completed in `/home/node/projects/gameaigents` with:
- `core` v6.2.0
- `bmm` v6.2.0
- `gds` v0.2.2 (**Game Dev Studio**)

Installed manifest confirms:
- `source: external`
- `npmPackage: bmad-game-dev-studio`
- `repoUrl: https://github.com/bmad-code-org/bmad-module-game-dev-studio.git`

## Important finding

The direct external registry path appears flaky right now.

### What failed
Attempting to install the external module via the normal registry/module code path did **not** reliably resolve the module source.

### What worked
The working approach was:
1. Clone the module repo locally
2. Install BMAD using the module repo's `src/` as `--custom-content`

## Working commands

### 1) Clone the module repo
```bash
git clone --depth 1 https://github.com/bmad-code-org/bmad-module-game-dev-studio.git /tmp/bmad-module-game-dev-studio
```

### 2) Install into a project
```bash
npx bmad-method@6.2.0 install \
  --directory /home/node/projects/gameaigents \
  --action install \
  --custom-content /tmp/bmad-module-game-dev-studio/src \
  --tools none \
  -y
```

## Safety / rollback

The previous `_bmad` directory was backed up before reinstall:
- `_bmad-backup-20260317T235410Z`

Rollback path if needed:
```bash
cd /home/node/projects/gameaigents
rm -rf _bmad
mv _bmad-backup-20260317T235410Z _bmad
```

## Notes

- The official upstream game module is now **Game Dev Studio** rather than relying only on the older Godot bundle fragments.
- The raw bundle files Vadim sent were also archived under `docs/reference/bmad-godot-bundle/` for comparison/reference.
- `tools none` was used in this environment because the container runtime does not expose the target IDE integrations directly.
- If later installing for Cursor / Claude Code / Windsurf on a developer machine, rerun install with the appropriate tool target there.
