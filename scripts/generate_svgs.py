
import os

BRANDS = [
    'azureva',
    'habitat',
    'aubureau',
    'hetic',
    'posse-studio',
    'inshallah',
    'dygest'
]

OUTPUT_DIR = 'public/images/brands'

if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

print(f"Generating SVGs in {OUTPUT_DIR}...")

def create_svg(name, text):
    # Simple SVG with text centered
    svg_content = f"""<svg width="200" height="80" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="transparent"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#555" text-anchor="middle" dominant-baseline="middle">{text}</text>
</svg>"""
    
    with open(f"{OUTPUT_DIR}/{name}.svg", 'w') as f:
        f.write(svg_content)
    print(f"✅ Created {name}.svg")

for brand in BRANDS:
    # Format text for display (capitalize, replace hyphens)
    display_text = brand.replace('-', ' ').title()
    if brand == 'aubureau': display_text = 'Au Bureau'
    if brand == 'posse-studio': display_text = 'Posse Studio'
    
    create_svg(brand, display_text)
