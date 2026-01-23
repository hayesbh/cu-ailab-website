from scholarly import scholarly, ProxyGenerator
import yaml

# 1. Optionally use proxies (recommended to avoid blocking)
#pg = ProxyGenerator()
#pg.FreeProxies()           # use free proxies
#scholarly.use_proxy(pg)    # set proxy for session

# 2. Load Google Scholar profile by ID (from the profile URL)
#    Example profile URL: https://scholar.google.com/citations?user=YOUR_ID
scholar_id = "OfYf-DMAAAAJ"
author = scholarly.search_author_id(scholar_id)

# 3. Fill author with publications
author = scholarly.fill(author, sections=["publications"])

pubs = author.get("publications", [])

formatted=[]
i=0
for pub in pubs:
  #print(pub)
  bib = pub.get('bib', {})
  entry = {
        "title": bib.get('title',''),
        "venue": bib.get('citation',''),
        "year": bib.get('pub_year',''),
        "authors": bib.get('author',''),
        "pages":bib.get('pages',''),
        "publisher":bib.get('publisher',''),  
        "links": {
            "pdf": pub.get('pub_url',''),
            "video": ""
        },
        "abstract": abstract or ""
  }
  formatted.append(entry)

  
print(yaml.dump(formatted, sort_keys=False))
with open("correll_pubs.yaml", "w") as f:
    f.write(yaml.dump(formatted, sort_keys=False))
