import type { Metadata } from 'next';
import { isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: '이용약관',
  description: 'BSVibe 이용약관',
};

const ko = (
  <>
    <h1>이용약관</h1>
    <p>최종 수정일: 2026년 4월 2일</p>
    <h2>1. 서비스 개요</h2>
    <p>
      BSVibe는 AI 소프트웨어 생태계로, BSGateway, BSNexus, BSupervisor, BSage 등 다양한 도구를
      제공합니다. 본 약관은 BSVibe 서비스 이용 시 이용자와 회사 사이의 권리·의무를 규정합니다.
    </p>
    <h2>2. 계정</h2>
    <p>
      서비스 이용을 위해서는 계정이 필요합니다. 이용자는 정확한 정보로 계정을 생성하고 관리할
      책임이 있으며, 비밀번호 관리에 유의해야 합니다.
    </p>
    <h2>3. 결제 및 환불</h2>
    <ul>
      <li>유료 플랜은 매월/매년 자동 결제됩니다.</li>
      <li>플랜 변경 시 차액은 일할 계산됩니다.</li>
      <li>구독 취소 시 현재 결제 기간 종료까지 이용 가능합니다.</li>
      <li>이미 결제된 금액은 별도 환불되지 않습니다.</li>
    </ul>
    <h2>4. 금지 행위</h2>
    <ul>
      <li>타인의 계정을 도용하거나 무단으로 사용하는 행위</li>
      <li>서비스를 통해 불법 콘텐츠를 생성·전송하는 행위</li>
      <li>서비스의 정상 운영을 방해하는 행위</li>
    </ul>
    <h2>5. 책임 제한</h2>
    <p>
      BSVibe는 서비스의 안정적 제공을 위해 노력하지만, 외부 LLM API 장애나 천재지변 등 불가항력적
      사유로 인한 손해에 대해서는 책임을 지지 않습니다.
    </p>
    <h2>6. 약관 변경</h2>
    <p>본 약관은 사전 통지 후 변경될 수 있으며, 변경 후에도 서비스를 계속 이용하면 동의로 간주됩니다.</p>
    <h2>7. 문의</h2>
    <p>
      약관 관련 문의:{' '}
      <a href="mailto:contact@bsvibe.dev">contact@bsvibe.dev</a>
    </p>
  </>
);

const en = (
  <>
    <h1>Terms of Service</h1>
    <p>Last updated: April 2, 2026</p>
    <h2>1. Service Overview</h2>
    <p>
      BSVibe is an AI software ecosystem with products including BSGateway, BSNexus, BSupervisor,
      and BSage. These terms govern the relationship between the user and the company.
    </p>
    <h2>2. Account</h2>
    <p>
      Service use requires an account. Users are responsible for accurate information and password
      hygiene.
    </p>
    <h2>3. Billing and Refunds</h2>
    <ul>
      <li>Paid plans auto-renew monthly/annually.</li>
      <li>Plan changes are prorated.</li>
      <li>On cancellation, service continues until the current period ends.</li>
      <li>Amounts already paid are not refunded separately.</li>
    </ul>
    <h2>4. Prohibited Conduct</h2>
    <ul>
      <li>Account theft or unauthorized use</li>
      <li>Generating or transmitting illegal content via the service</li>
      <li>Disrupting service operations</li>
    </ul>
    <h2>5. Limitation of Liability</h2>
    <p>
      BSVibe strives for reliable operation but is not liable for damages caused by upstream LLM
      API outages or force majeure events.
    </p>
    <h2>6. Changes</h2>
    <p>These terms may change after prior notice; continued use constitutes acceptance.</p>
    <h2>7. Contact</h2>
    <p>
      Questions:{' '}
      <a href="mailto:contact@bsvibe.dev">contact@bsvibe.dev</a>
    </p>
  </>
);

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'ko';
  return (
    <div
      className="prose-body"
      style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px 120px' }}
    >
      {locale === 'en' ? en : ko}
    </div>
  );
}
