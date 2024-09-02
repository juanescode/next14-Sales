/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Kib3voKAjjN
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
          <div className="text-8xl font-bold text-primary-foreground">404</div>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops, página no encontrada
        </h1>
        <p className="mt-4 text-muted-foreground">
          Lo sentimos, pero la página que estás buscando no existe. Puede que se haya movido o eliminado.
        </p>
        <div className="mt-6">
          <Link
            href="/admin/products"
             className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            Ir a Productos
          </Link>
        </div>
      </div>
    </div>
  )
}