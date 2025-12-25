import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "Aucun fichier reçu." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = "/home/yassine/animalerie_logs/input_logstash";
    const filePath = path.join(uploadDir, file.name);

    await writeFile(filePath, buffer);

    return NextResponse.json({ message: "Fichier uploadé avec succès !" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
