---
title: "Generative Models for Climate Science"
subtitle: "Developing novel diffusion models to predict extreme weather events with higher accuracy than traditional meteorological simulations."
status: "Active"
categories: ["Climate AI", "Machine Learning"]
hero_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5YnG3XZ7gMrxPPeeyKK1Tv5b_dEKIMHudACvyA_dOrhyXMg8hyhvzCuoKxmgMVFbDbhiiR-Ctuf9J7bm2eiX13PcLY_XEridIH35Ct6-1lbkYaVZtGn4JYgKqYATp9dH3fLwR_69oX8o6kLNDjW3RXtJNrcKjnvNSrNFOCIyv2C62nKLbB4yWyexND9CuKThv1oigBHcVVFCI3INaGedMIVrwItEcpZfM1JcZPCmbPDo-iBF_lZHQ_YhEQlF5-GTHuEpnhG2uCtk"
duration: "2022 - 2025"
funding: "NSF, NOAA"
team:
  pis:
    - name: "Dr. Chris Lee"
      role: "Assistant Professor"
      department: "Computer Science"
      initials: "CL"
    - name: "Dr. Sarah Patel"
      role: "Associate Professor"
      department: "Atmospheric Sciences"
      initials: "SP"
  researchers:
    - name: "Marcus Johnson"
      role: "PhD Candidate, CS"
    - name: "Emily Davis"
      role: "PhD Student, ATOC"
    - name: "Alex Chen"
      role: "Undergraduate Researcher"
related_publications:
  - title: "Generative Diffusion for Atmospheric Dynamics"
    venue: "NeurIPS 2023"
    authors: "C. Lee, M. Garcia, et al."
    year: "2023"
  - title: "Benchmarking AI Weather Models"
    venue: "ICLR 2024 (Under Review)"
    authors: "J. Doe, C. Lee"
    year: "2024"
---

### Project Overview

Climate change poses an existential threat to humanity, necessitating accurate and timely predictions of extreme weather events. Traditional numerical weather prediction (NWP) models, while effective, are computationally expensive and often struggle with capturing fine-grained spatiotemporal dependencies. Our research introduces a novel class of generative diffusion models tailored for climate science.

By leveraging large-scale historical climate data, our models learn the underlying probability distributions of weather patterns. This allows for the rapid generation of high-fidelity forecasts and the simulation of rare, extreme events that are often underrepresented in standard datasets.

> **Key Innovation**
>
> *"Replacing deterministic physics-based solvers with probabilistic neural operators reduces computational cost by 1000x while maintaining physical consistency."*

### Methodology

We employ a hierarchical approach, starting with a coarse-grained global model that feeds into high-resolution regional downscaling networks. The core architecture utilizes a U-Net backbone enhanced with attention mechanisms to capture long-range teleconnections in the climate system.

![Simulation Demo: El Niño Prediction](https://lh3.googleusercontent.com/aida-public/AB6AXuDRhbb8UPBvKhgJ6bm2Dw88IivgsI0oHdLmyHQeTQ8nHyT0aB1_aE1r-CubejWuVSyV7uuAjuavgqhlMu1UTjKSVKfGXikhXGpR-VsCPyLzQSuI6JuPSIvspOhZq2YER3a1EPzj4Cu9NRn6pYsizpS7rWYNkpOqfGZWPcv235pyl82HnJuCq-wAUBgzAlPyAiXtZjL-sZxpXZVdCljYPImMJy8QLZ9omkmfrvhtzSchr36_JOXUNUvGJHaIuU-DFTJy5ov8P2sFMQs)

### Preliminary Results

Initial benchmarks against the ERA5 reanalysis dataset show a 15% improvement in Root Mean Square Error (RMSE) for 7-day temperature forecasts. More importantly, our model successfully predicted the onset of the 2023 Pacific heatwave 5 days earlier than operational NWP systems.
