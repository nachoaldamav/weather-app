import Head from 'next/head'

export default function HeaderIcons({ name }: { name?: string }) {
  return (
    <Head>
      <link
        rel="icon"
        type="image/png"
        sizes="48x48"
        href={`/icons/${name || 'clear'}/maskable_icon_x48.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="72x72"
        href={`/icons/${name || 'clear'}/maskable_icon_x72.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href={`/icons/${name || 'clear'}/maskable_icon_x96.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="128x128"
        href={`/icons/${name || 'clear'}/maskable_icon_x128.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href={`/icons/${name || 'clear'}/maskable_icon_x192.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="384x384"
        href={`/icons/${name || 'clear'}/maskable_icon_x384.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href={`/icons/${name || 'clear'}/maskable_icon_x512.png`}
      />
    </Head>
  )
}
