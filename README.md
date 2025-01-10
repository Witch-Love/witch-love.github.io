# Witch Love Website

## Mkdocs

### Test environment setup for MkDocs

1. Install the requirements
```
python -m pip install --upgrade pip
pip install mkdocs mkdocs-material mkdocs-git-revision-date-localized-plugin mkdocs-git-committers-plugin-2 mkdocs-glightbox
```

2. Then simply run the task from visual studio code or run manually:
```
cd mkdocs
mkdocs serve
```

### Page Meta

1. Comments: `comments: <bool>` (default is false)
2. Page status: `status: <new|draft|deprecated>` (default is null)