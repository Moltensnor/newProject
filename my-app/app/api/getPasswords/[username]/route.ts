export async function GET(request: Request, context: any) {
    const { params } = context
    const passwordReq = await fetch("http://localhost:8080/api/v1/passwords/user/" + params.username, {
    method: "GET",
    cache: "no-store",
    headers: new Headers({
        "Authorization": 'Basic ' + btoa("admin:password")
    })
  })

  const passwords = await passwordReq.json()

  return Response.json({ passwords })
}