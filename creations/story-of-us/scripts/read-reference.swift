import Foundation
import ImageIO
import Vision
let input = CommandLine.arguments[1]
var rows: [[String: Any]] = []
for i in 0..<567 {
  autoreleasepool {
    let t = Double(i) * 0.5
    let url = URL(fileURLWithPath: input).appendingPathComponent(String(format:"%04d.png",i+1))
    guard let source = CGImageSourceCreateWithURL(url as CFURL, nil),
          let crop = CGImageSourceCreateImageAtIndex(source,0,nil) else { return }
    let req = VNRecognizeTextRequest()
    req.recognitionLanguages = ["zh-Hans", "en-US"]
    req.recognitionLevel = .accurate
    req.usesCPUOnly = true
    req.usesLanguageCorrection = false
    do { try VNImageRequestHandler(cgImage:crop).perform([req]) } catch { if i == 0 { FileHandle.standardError.write(Data("OCR error: \(error)\n".utf8)) } }
    let result = (req.results ?? []).compactMap { $0.topCandidates(1).first?.string }.joined(separator:"")
    rows.append(["t":t, "text":result])
  }
}
let data = try JSONSerialization.data(withJSONObject:rows, options:[.prettyPrinted,.sortedKeys,.withoutEscapingSlashes])
FileHandle.standardOutput.write(data)
