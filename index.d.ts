type LoadingTarget = HTMLImageElement | string

export function loadImage<Target extends LoadingTarget>(
  img: Target,
): Promise<HTMLImageElement>

export function loadImages<TargetList extends LoadingTarget[]>(
  imgs: TargetList,
): Promise<HTMLImageElement[]>