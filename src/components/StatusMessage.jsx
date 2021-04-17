export default function StatusMessage({ success }) {
  return (
    <div className="status-message-container">
      <div className={"status-message" + (success ? "" : " error")}>
        {success ? "Спасибо! Заказ успешно отправлен." : "Ошибка! Попробуйте ещё раз через пару минут."}
      </div>
    </div>
  )
}
