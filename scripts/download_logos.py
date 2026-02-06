
import os
import urllib.request
import ssl

# Bypass SSL verification if needed (for some dev environments)
ssl._create_default_https_context = ssl._create_unverified_context

BRANDS = {
    'azureva': 'https://logo.clearbit.com/azureva-vacances.com',
    'habitat': 'https://logo.clearbit.com/habitat.fr',
    'aubureau': 'https://logo.clearbit.com/aubureau.fr',
    'hetic': 'https://logo.clearbit.com/hetic.net',
    'posse-studio': 'https://logo.clearbit.com/posse.studio',
    'inshallah': 'https://logo.clearbit.com/inshallah.com',
    'dygest': 'https://logo.clearbit.com/dygest.ai'
}

OUTPUT_DIR = 'public/images/brands'

if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

print(f"Downloading logos to {OUTPUT_DIR}...")

opener = urllib.request.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0')]
urllib.request.install_opener(opener)

for name, url in BRANDS.items():
    try:
        print(f"Downloading {name} from {url}...")
        urllib.request.urlretrieve(url, f"{OUTPUT_DIR}/{name}.png")
        print(f"✅ Downloaded {name}.png")
    except Exception as e:
        print(f"❌ Error downloading {name}.png: {e}")
