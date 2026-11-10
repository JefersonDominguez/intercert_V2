# Libro de Reclamaciones — Resend

El formulario **no guarda en BD**. El backend envía dos correos con [Resend](https://resend.com/):

| # | Destino | Contenido |
|---|---------|-----------|
| 1 | `info@intercertlatam.com` | Reclamo/queja completo (`reply_to` = email del usuario) |
| 2 | Email del usuario | Copia de confirmación |

**API:** `POST /api/forms/libro-reclamaciones/`

## Qué necesitas en Resend

1. **Cuenta** en [resend.com](https://resend.com)
2. **Dominio verificado** `intercertlatam.com` (DNS: SPF, DKIM en el panel de Resend)
3. **API Key** con permiso de envío → `RESEND_API_KEY`
4. **Remitente** autorizado: `no-reply@intercertlatam.com` (ya usado en el código)

## Variables en el servidor (`.env` del backend)

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
LIBRO_RECLAMACIONES_EMAIL=info@intercertlatam.com
```

`LIBRO_RECLAMACIONES_EMAIL` es opcional; por defecto es `info@intercertlatam.com`.

## Probar en local

**Opción A — Sin backend local** (proxy a producción):

`frontend/.env.development.local`:
```env
VITE_DEV_API_TARGET=https://intercertlatam.com
```

Requiere que **producción** ya tenga `RESEND_API_KEY` configurada.

**Opción B — Backend local:**

1. `backend/.env` con `RESEND_API_KEY` y BD/redis (o Docker local)
2. `python manage.py runserver 0.0.0.0:8000`
3. `frontend/.env.development.local` sin `VITE_DEV_API_TARGET` (proxy a `127.0.0.1:8000`)

Luego: `http://localhost:5175/libro-de-reclamaciones` → enviar con tu email real.

## Verificar

- Bandeja `info@intercertlatam.com` → reclamo nuevo
- Tu email → copia
- Logs backend: `docker compose ... logs backend` si falla

## Producción

Tras deploy del backend con `RESEND_API_KEY` en `.env` del servidor, reiniciar:

```bash
docker compose -f docker-compose.production.yml restart backend
```
