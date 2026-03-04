

## Plan: Rebuild Simulator as Dedicated Page with Wrap + Tint Modes

### What changes

1. **Remove simulator from homepage** — Delete the `<Simulator3D />` from `Index.tsx`. Keep the component files but repurpose them.

2. **Create a dedicated `/simulator` page** — New route at `/simulator` with a completely rebuilt simulator that has two modes: **Wrap** and **Tint**.

3. **Use a single car model** — Use the Supercar (Lamborghini) GLB as the sole vehicle. Remove the vehicle type selector entirely. This model has distinct body, window, and rim meshes making it ideal for both wrap and tint simulation.

4. **Rewrite material logic in `VehicleModels.tsx`** to support two separate concerns:
   - **Wrap mode**: Color only body panels. Explicitly exclude rims/wheels (check mesh name AND material name for "rim", "wheel", "hub", "spoke", "brake", "caliper") in addition to existing glass/tire/light exclusions. This fixes the rim color issue.
   - **Tint mode**: Apply tint darkness to window/glass materials only. Adjust opacity and color of transparent materials whose names contain "glass", "window", or that have `transparent: true && opacity < 0.9`.

5. **New UI controls on the simulator page**:
   - **Tab switcher**: "Wrap" | "Tint" tabs
   - **Wrap tab**: Color palette + finish selector (existing)
   - **Tint tab**: Tint darkness slider (e.g., Light 70% → Limo 5% VLT) with preset levels
   - Both wrap color and tint are applied simultaneously so users see the combined result
   - WhatsApp CTA with both selections in the message

6. **Update navigation** — Add "Simulator" link to the Navbar pointing to `/simulator`.

7. **Update router** — Add `/simulator` route in `App.tsx`.

### Files to modify
- `src/pages/Index.tsx` — Remove Simulator3D import and usage
- `src/components/simulator/VehicleModels.tsx` — Rewrite to single model, add `tintLevel` prop, improve rim exclusion logic
- `src/components/Simulator3D.tsx` — Rebuild with Wrap/Tint tabs, remove vehicle selector, add tint controls
- `src/pages/Simulator.tsx` — New page wrapper
- `src/App.tsx` — Add `/simulator` route
- `src/components/Navbar.tsx` — Add Simulator nav link

