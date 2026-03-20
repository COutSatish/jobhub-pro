import os

files = [
    '/Users/satishkumarpyata/.gemini/antigravity/scratch/job-search-tool/src/App.jsx', 
    '/Users/satishkumarpyata/.gemini/antigravity/scratch/job-search-tool/src/index.css'
]

replacements = {
    'surfaceContainerLow': 'surface-container-low',
    'surfaceContainerHigh': 'surface-container-high',
    'surfaceContainerHighest': 'surface-container-highest',
    'primaryContainer': 'primary-container',
    'secondaryContainer': 'secondary-container',
    'textPrimary': 'text-primary',
    'textSecondary': 'text-secondary',
    'outlineVariant': 'outline-variant'
}

prefixes = ['bg-', 'border-', 'text-', 'from-', 'to-', 'ring-']

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    # Find combinations like bg-surfaceContainerLow and replace with bg-surface-container-low
    for camel, kebab in replacements.items():
        for prefix in prefixes:
            content = content.replace(f'{prefix}{camel}', f'{prefix}{kebab}')
            
    # Also replace direct usages that might exist without prefix?
    # the only one is bg-outlineVariant which we covered (wait, bg is a prefix).
    
    with open(f, 'w') as file:
        file.write(content)
print("CSS Classes Fixed successfully!")
