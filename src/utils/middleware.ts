export async function nextFactory(context, middleware, index) {
  const subsequentMiddleware = await middleware[index]

  // default `next()` callback is returned if no subsequent
  if (!subsequentMiddleware) return context.next

  return async (...parameters) => {
    // fire the default Vue Router `next()` callback first.
    context.next(...parameters)

    // then run the subsequent middleware with a new `nextMiddleware()` callback.
    const nextMiddleware = await nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}

export const middlewareFactory = (data) => async (to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta?.middleware) ? to.meta.middleware : [to.meta.middleware]
    const context = Object.assign(
      {
        from,
        next,
        to
      },
      data
    )
    const nextMiddleware = await nextFactory(context, middleware, 1)
    return await middleware[0]({ ...context, next: nextMiddleware })
  }

  return next()
}
