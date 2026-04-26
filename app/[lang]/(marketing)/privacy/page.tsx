import type { Metadata } from 'next';
import { isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: 'BSVibe 개인정보처리방침',
};

const ko = (
  <>
    <h1>개인정보처리방침</h1>
    <p>최종 수정일: 2026년 4월 2일</p>
    <h2>1. 수집하는 개인정보</h2>
    <p>BSVibe는 서비스 제공을 위해 다음 정보를 수집합니다:</p>
    <ul>
      <li>
        <strong>계정 정보</strong>: 이메일 주소 (Supabase 인증을 통해 수집)
      </li>
      <li>
        <strong>서비스 이용 기록</strong>: API 호출 로그, 사용량 통계
      </li>
      <li>
        <strong>기기 정보</strong>: 브라우저 유형, IP 주소 (보안 목적)
      </li>
    </ul>
    <h2>2. 개인정보의 이용 목적</h2>
    <ul>
      <li>서비스 제공 및 계정 관리</li>
      <li>사용량 기반 과금 및 비용 추적</li>
      <li>서비스 개선 및 버그 수정</li>
      <li>보안 위협 탐지 및 대응</li>
    </ul>
    <h2>3. 개인정보의 보관 및 파기</h2>
    <p>
      개인정보는 서비스 이용 기간 동안 보관되며, 계정 삭제 요청 시 30일 이내에 파기합니다. 법령에
      따라 보관이 필요한 경우 해당 기간 동안 보관 후 파기합니다.
    </p>
    <h2>4. 개인정보의 제3자 제공</h2>
    <p>
      BSVibe는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 단, 다음의 경우는
      예외입니다:
    </p>
    <ul>
      <li>법률에 의한 요청이 있는 경우</li>
      <li>서비스 제공을 위해 필수적인 외부 서비스 연동 (Supabase 인증)</li>
    </ul>
    <h2>5. 개인정보의 안전성 확보 조치</h2>
    <ul>
      <li>모든 통신은 TLS/HTTPS로 암호화</li>
      <li>API 키는 AES-256-GCM으로 암호화 저장</li>
      <li>JWT 기반 인증 (ES256 서명)</li>
      <li>접근 권한 최소화 원칙 적용</li>
    </ul>
    <h2>6. 문의</h2>
    <p>
      개인정보 관련 문의는{' '}
      <a href="mailto:contact@bsvibe.dev">contact@bsvibe.dev</a>로 보내주세요.
    </p>
  </>
);

const en = (
  <>
    <h1>Privacy Policy</h1>
    <p>Last updated: April 2, 2026</p>
    <h2>1. Information We Collect</h2>
    <p>BSVibe collects the following information to provide its services:</p>
    <ul>
      <li>
        <strong>Account information</strong>: email address (collected via Supabase Auth)
      </li>
      <li>
        <strong>Usage records</strong>: API call logs, usage statistics
      </li>
      <li>
        <strong>Device information</strong>: browser type, IP address (for security)
      </li>
    </ul>
    <h2>2. Purpose of Use</h2>
    <ul>
      <li>Service delivery and account management</li>
      <li>Usage-based billing and cost tracking</li>
      <li>Product improvement and bug fixes</li>
      <li>Security threat detection and response</li>
    </ul>
    <h2>3. Retention and Deletion</h2>
    <p>
      Personal information is retained while the service is used, and deleted within 30 days of an
      account deletion request. Where laws require longer retention, we retain only for that period.
    </p>
    <h2>4. Third-Party Sharing</h2>
    <p>
      BSVibe does not share personal information with third parties without user consent, except:
    </p>
    <ul>
      <li>When required by law</li>
      <li>To essential third-party integrations needed to provide the service (Supabase Auth)</li>
    </ul>
    <h2>5. Security Measures</h2>
    <ul>
      <li>All traffic is encrypted via TLS/HTTPS</li>
      <li>API keys are encrypted at rest with AES-256-GCM</li>
      <li>JWT authentication (ES256-signed)</li>
      <li>Principle of least privilege for access</li>
    </ul>
    <h2>6. Contact</h2>
    <p>
      Privacy questions:{' '}
      <a href="mailto:contact@bsvibe.dev">contact@bsvibe.dev</a>
    </p>
  </>
);

export default async function PrivacyPage({
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
