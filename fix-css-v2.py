import os

files = [
    '/Users/satishkumarpyata/.gemini/antigravity/scratch/job-search-tool/src/App.jsx', 
    '/Users/satishkumarpyata/.gemini/antigravity/scratch/job-search-tool/src/index.css'
]

replacements = {
    'surface-container-low': 'surface-low',
    'surface-container-high': 'surface-high',
    'surface-container-highest': 'surface-highest',
    'text-text-primary': 'text-txt',
    'text-text-secondary': 'text-txt-muted',
    'text-primary': 'txt',           # if they didn't have text- prefix somehow
    'text-secondary': 'txt-muted',
    'outlineVariant': 'outline-variant', # fallback just in case
    'surfaceContainerLow': 'surface-low',
    'surfaceContainerHigh': 'surface-high',
    'surfaceContainerHighest': 'surface-highest',
    'textPrimary': 'txt',
    'textSecondary': 'txt-muted'
}

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
            
    with open(f, 'w') as file:
        file.write(content)
print("CSS Classes Fixed successfully!")
