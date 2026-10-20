/**
 * Host half of Model Selecter. The composer's model seat is a Client-only
 * surface, so this half deliberately has no Host behavior; it exists so the
 * bundle has one Loader row whose package also declares `dsh.client`.
 */
export function apply() {}
