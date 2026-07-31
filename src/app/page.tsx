import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

const HOW_IT_WORKS_MOM = [
  { step: "1", title: "신청하기", desc: "필요한 돌봄 종류와 일정을 간단히 입력해요." },
  { step: "2", title: "매칭받기", desc: "인근에 거주하는 워킹맘 출신 시니어를 연결해 드려요." },
  { step: "3", title: "돌봄 시작", desc: "약속된 시간에 안심하고 아이를 맡길 수 있어요." },
];

const HOW_IT_WORKS_SENIOR = [
  { step: "1", title: "지원하기", desc: "경력과 가능한 시간대를 간단히 등록해요." },
  { step: "2", title: "매칭받기", desc: "조건에 맞는 돌봄 요청을 안내받아요." },
  { step: "3", title: "긱 활동", desc: "1~2시간부터 며칠까지, 원하는 만큼만 일해요." },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-16 text-center sm:py-24">
          <span className="inline-block rounded-full bg-zinc-900 px-4 py-1 text-xs font-semibold tracking-wide text-white">
            돌봄이음
          </span>
          <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-5xl">
            워킹맘의 급한 돌봄을,
            <br />
            워킹맘 출신 시니어의 손길로
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
            단기·긴급 육아 돌봄이 필요한 워킹맘과, 육아를 직접 경험한 5060 시니어를
            연결합니다. 워킹맘에게는 믿을 수 있는 시터 서비스를, 시니어에게는 1~2시간부터
            며칠까지 원하는 만큼 일할 수 있는 긱 일자리를 제공합니다.
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            <Link
              href="/workingmom"
              className="group flex flex-col items-start rounded-2xl border border-rose-200 bg-rose-50 p-6 text-left transition-shadow hover:shadow-lg"
            >
              <span className="rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white">
                돌봄이 필요해요
              </span>
              <h2 className="mt-4 text-xl font-bold text-zinc-900">워킹맘 신청하기</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                긴급·단기 시터 서비스가 필요하신가요? 지금 바로 신청해 보세요.
              </p>
              <span className="mt-4 text-sm font-semibold text-rose-700 group-hover:underline">
                신청 폼 작성하기 →
              </span>
            </Link>

            <Link
              href="/senior"
              className="group flex flex-col items-start rounded-2xl border border-teal-200 bg-teal-50 p-6 text-left transition-shadow hover:shadow-lg"
            >
              <span className="rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white">
                일하고 싶어요
              </span>
              <h2 className="mt-4 text-xl font-bold text-zinc-900">시니어 지원하기</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                육아 경력을 살려 자유로운 시간에 일해보고 싶으신가요?
              </p>
              <span className="mt-4 text-sm font-semibold text-teal-700 group-hover:underline">
                지원 폼 작성하기 →
              </span>
            </Link>
          </div>
        </section>

        <section className="border-t border-zinc-200 bg-white py-16">
          <div className="mx-auto grid max-w-5xl gap-12 px-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-rose-600">
                워킹맘이라면
              </h3>
              <ol className="mt-4 space-y-4">
                {HOW_IT_WORKS_MOM.map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-700">
                      {item.step}
                    </span>
                    <div>
                      <p className="font-semibold text-zinc-900">{item.title}</p>
                      <p className="text-sm text-zinc-600">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-600">
                시니어라면
              </h3>
              <ol className="mt-4 space-y-4">
                {HOW_IT_WORKS_SENIOR.map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
                      {item.step}
                    </span>
                    <div>
                      <p className="font-semibold text-zinc-900">{item.title}</p>
                      <p className="text-sm text-zinc-600">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-zinc-50 py-8 text-center text-xs text-zinc-500">
        © 2026 돌봄이음. 본 페이지는 서비스 출시 전 리드 수집을 위한 페이지입니다.
      </footer>
    </div>
  );
}
