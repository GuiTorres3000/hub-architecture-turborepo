import type { ZodSchema } from "@app/types";

export interface HttpClientOptions {
  baseUrl: string;
  getToken?: () => string | null;
}

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly body?: unknown,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

/** Thin typed fetch wrapper with optional Zod response validation. */
export class HttpClient {
  constructor(private readonly options: HttpClientOptions) {}

  async request<T>(
    path: string,
    init: RequestInit & { schema?: ZodSchema<T> } = {},
  ): Promise<T> {
    const { schema, headers, ...rest } = init;
    const token = this.options.getToken?.() ?? null;

    const res = await fetch(`${this.options.baseUrl}${path}`, {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    });

    const body = res.status === 204 ? null : await res.json().catch(() => null);

    if (!res.ok) {
      throw new HttpError(res.status, `Request to ${path} failed`, body);
    }

    return schema ? schema.parse(body) : (body as T);
  }
}
