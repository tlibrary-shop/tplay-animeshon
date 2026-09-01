import InfoPage from "@/components/InfoPage";
import type { Metadata } from "next";
import { SITE_URL } from "@/utils/config";

export const metadata: Metadata = {
  title: "DMCA dan Pemberitahuan Hak Cipta",
  description: "Informasi pengajuan pemberitahuan hak cipta dan permintaan penghapusan tautan di AniStream.",
  alternates: { canonical: `${SITE_URL}/dmca` },
};

export default function DmcaPage() {
  return <InfoPage title="DMCA / Copyright" description="AniStream menghormati hak kekayaan intelektual dan menyediakan jalur pemberitahuan hak cipta." sections={[
    { title: "Pemberitahuan pelanggaran", content: "Pemegang hak atau perwakilan resminya dapat mengirimkan permintaan peninjauan melalui halaman Kontak. Sertakan nama pemegang hak, identitas karya, URL halaman yang dipermasalahkan, pernyataan kepemilikan atau kewenangan, serta informasi kontak yang dapat diverifikasi." },
    { title: "Peninjauan dan tindakan", content: "Setiap laporan akan ditinjau secara wajar. Jika laporan memenuhi informasi yang diperlukan, tautan atau materi terkait dapat dibatasi atau dihapus dari indeks situs. AniStream tidak mengklaim kepemilikan atas merek, karakter, atau materi milik pihak lain." },
    { title: "Informasi pihak ketiga", content: "Halaman tertentu dapat memuat tautan atau pemutar dari layanan pihak ketiga. Layanan tersebut memiliki kebijakan dan tanggung jawabnya sendiri. Jangan mengirimkan materi berhak cipta yang tidak diperlukan dalam laporan." },
  ]} />;
}
