import * as hono from "https://deno.land/x/hono@v3.8.1/mod.ts";
import { nnid } from "./lib/nnid.ts";
import { gen } from "./lib/gen.ts";
import { genuser } from "./lib/genuser.ts";
const app = new hono.Hono();

app
  .get("/", async (c) => {
    let file: Deno.FsFile;
    let stream: ReadableStream<Uint8Array>;
    try {
      file = await Deno.open("./index.html", { read: true });
      stream = file.readable;
    } catch {
      return new Response("NOT FOUND", { status: 404 });
    }
    return new Response(stream, {
      status: 200,
      headers: {
        "content-type": "text/html",
      },
    });
  })
  .get("/id/:id", async (c) => {
    const { id } = await c.req.param();
    let result: string;
    switch (id) {
      case "uuid":
        result = crypto.randomUUID();
        return c.html(result);
      case "nanoid":
        result = nnid(36);
        return c.html(result);
      case "username":
        result = await genuser(15);
        return c.html(result);
    }
  })
  .post("/id", async (c) => {
    const { id } = await c.req.parseBody();
    let result: string;
    switch (id) {
      case "uuid":
        result = crypto.randomUUID();
        return c.html(result);
      case "nanoid":
        result = nnid(36);
        return c.html(result);
      case "username":
        result = await genuser(15);
        return c.html(result);
    }
  })
  .post("/length", async (c) => {
    const { length } = await c.req.parseBody();
    const result = gen(length as unknown as number);
    return c.html(result);
  });

Deno.serve(app.fetch);
